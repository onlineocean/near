use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
use near_sdk::collections::{UnorderedMap};
use std::collections::HashMap;
use std::convert::TryInto;
use near_sdk::AccountId;
use near_sdk::json_types::{U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::serde_json;
use near_sdk::Promise;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct NFTContract {
    pub tokens: UnorderedMap<String, Token>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
pub struct Token {
    pub owner_id: String,
    pub metadata: TokenMetadata,
    pub price: U128,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenMetadata {
    pub title: Option<String>,
    pub description: Option<String>,
    pub media: Option<String>,
    pub media_hash: Option<String>,
    pub copies: Option<U128>,
    pub collection_name: Option<String>,
    pub collection_id: Option<String>,
    pub status: Option<String>,
}

impl Default for NFTContract {
    fn default() -> Self {
        env::panic_str("This contract should be initialized before usage")
    }
}

#[near_bindgen]
impl NFTContract {
    #[init(ignore_state)]
    pub fn new() -> Self {
        env::log_str("Creating new NFTContract");
        Self { tokens: UnorderedMap::new(b"t".to_vec()) }
    }

    #[payable]
    pub fn nft_mint(&mut self, token_id: String, metadata: TokenMetadata, price: U128) {
        env::log_str(&format!("Minting new token with id {}", token_id));
        let initial_storage_usage = env::storage_usage();
        let owner_id = env::predecessor_account_id().to_string();
        let token = Token { owner_id, metadata, price };
        self.tokens.insert(&token_id, &token);
        let storage_usage = if initial_storage_usage <= env::storage_usage() {
            env::storage_usage() - initial_storage_usage
        } else {
            0
        };
        let storage_cost = U128(env::storage_byte_cost() * storage_usage as u128);
        let attached_deposit = U128(env::attached_deposit());
        assert!(attached_deposit >= storage_cost, "Not enough attached deposit to cover storage cost");
        if attached_deposit > storage_cost {
            let refund = attached_deposit.0 - storage_cost.0;
            if refund > 0 {
                env::log_str(&format!("Refunding {} yoctoNEAR", refund));
                Promise::new(env::predecessor_account_id()).transfer(refund);
            }
        }
    }

    pub fn nft_token(&self, token_id: String) -> Option<Token> {
        env::log_str(&format!("Getting token with id {}", token_id));
        self.tokens.get(&token_id)
    }

    pub fn get_all_tokens(&self) -> Vec<(String, Token)> {
        let mut all_tokens = Vec::new();
        for entry in self.tokens.iter() {
            all_tokens.push(entry);
        }
        env::log_str(&format!("All tokens: {}", serde_json::to_string(&all_tokens).unwrap()));
        all_tokens
    }

    pub fn nft_transfer(&mut self, receiver_id: String, token_id: String, status: Option<String>) {
        env::log_str(&format!("Transferring token with id {} to {}", token_id, receiver_id));
        let mut token = self.tokens.get(&token_id).expect("Token not found");
        // assert_eq!(env::predecessor_account_id().as_ref(), token.owner_id.as_str(), "Only the owner can transfer the token");
        token.owner_id = receiver_id;
        if let Some(status) = status {
            token.metadata.status = Some(status);
        }
        self.tokens.insert(&token_id, &token);
    }

    pub fn nft_update_price(&mut self, token_id: String, new_price: U128) {
        let mut token = self.tokens.get(&token_id).expect("Token not found");
        assert_eq!(env::predecessor_account_id().as_ref(), token.owner_id.as_str(), "Only the owner can update the price");
        token.price = new_price;
        self.tokens.insert(&token_id, &token);
    }

    pub fn clear_all_storage(&mut self) {
        let keys: Vec<String> = self.tokens.keys().into_iter().collect();
        for key in keys {
            self.tokens.remove(&key);
        }
        env::log_str("All storage has been cleared.");
    }

    pub fn get_my_tokens(&self, account_id: String) -> Vec<(String, Token)> {
        let mut my_tokens = Vec::new();
        for (token_id, token) in self.tokens.iter() {
            if token.owner_id == account_id {
                my_tokens.push((token_id, token));
            }
        }
        my_tokens
    }

    pub fn get_launchpad_tokens(&self) -> Vec<(String, Vec<(Token, String)>)> {
        let mut collections: HashMap<String, Vec<(Token, String)>> = HashMap::new();
        for (token_id, token) in self.tokens.iter() {
            if let Some(collection_name) = &token.metadata.collection_name {
                if let Some(collection_id) = &token.metadata.collection_id {
                    let collection_key = format!("{}:{}", collection_name, collection_id);
                    collections.entry(collection_key).or_insert_with(Vec::new).push((token, token_id));
                }
            }
        }
        let mut result: Vec<(String, Vec<(Token, String)>)> = collections.into_iter().collect();
        result.sort_by_key(|(collection_key, _tokens)| collection_key.to_string());
        result
    }


    #[payable]
    pub fn nft_purchase(&mut self, token_id: String, receiver_id: String, status: Option<String>) {
        let token = self.tokens.get(&token_id).expect("Token not found");
        let price = token.price.0;
        let deposit = env::attached_deposit();
        assert!(deposit >= price, "Not enough deposit to purchase token");
        let owner_id: AccountId = token.owner_id.clone().try_into().unwrap();
        Promise::new(owner_id).transfer(price);
        self.nft_transfer(receiver_id, token_id, status);
    }
    
    #[payable]
    pub fn nft_purchase_batch(&mut self, purchases: Vec<(String, String, Option<String>)>) {
        let deposit = env::attached_deposit();
        let mut total_price = 0;
        for (token_id, _, _) in purchases.iter() {
            let token = self.tokens.get(token_id).expect("Token not found");
            total_price += token.price.0;
        }
        assert!(deposit >= total_price, "Not enough deposit to purchase tokens");
        for (token_id, receiver_id, status) in purchases {
            self.nft_purchase(token_id, receiver_id, status);
        }
    }


}