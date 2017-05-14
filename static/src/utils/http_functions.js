/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
  headers: {
    'Authorization': token, // eslint-disable-line quote-props
  },
});

export function validate_token(token) {
  return axios.post('/api/is_token_valid', {
    token,
  });
}

export function get_github_access() {
  window.open(
    '/github-login',
    '_blank' // <- This is what makes it open in a new window.
  );
}

export function create_user(email, password) {
  return axios.post('api/create_user', {
    email,
    password,
  });
}

export function get_token(email, password) {
  return axios.post('api/get_token', {
    email,
    password,
  });
}

export function has_github_token(token) {
  return axios.get('api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
  return axios.get('api/user', tokenConfig(token));
}

export function data_about_accounts(token) {
  return axios.get('api/accounts', tokenConfig(token))
}

export function create_account(token, label, bank, iban, bic) {
  return axios.post('api/accounts/create', {
    label,
    bank,
    iban,
    bic,
  }, tokenConfig(token));
}

export function edit_account(token, id, label, bank, iban, bic) {
  return axios.post('api/accounts/edit', {
    id,
    label,
    bank,
    iban,
    bic,
  }, tokenConfig(token));
}

export function delete_account(token, id) {
  return axios.post('api/accounts/delete', {
    id,
  }, tokenConfig(token));
}

export function data_about_transactions(token, account_id) {
  return axios.get('api/transactions', tokenConfig(token))
}

export function create_transaction(token, transaction_id, account_id, label, amount, reccurent_group_id, date) {
  return axios.post('api/transactions/create', {
    transaction_id,
    account_id,
    label,
    amount,
    reccurent_group_id,
    date
  }, tokenConfig(token));
}

export function edit_transaction(token, transaction_id, label, amount, date) {
  return axios.post('api/transactions/edit', {
    transaction_id,
    label,
    amount,
    date,
  }, tokenConfig(token));
}

export function delete_transaction(token, transaction_id) {
  return axios.post('api/transactions/delete', {
    transaction_id,
  }, tokenConfig(token));
}
