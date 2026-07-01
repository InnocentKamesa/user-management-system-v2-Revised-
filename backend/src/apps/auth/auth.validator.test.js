import test from 'node:test';
import assert from 'node:assert/strict';
import { loginValidator } from './auth.validator.js';

test('loginValidator rejects missing credentials', () => {
  const req = { body: {} };
  let statusCode;
  let payload;

  const res = {
    status(code) {
      statusCode = code;
      return {
        json(data) {
          payload = data;
        }
      };
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  loginValidator(req, res, next);

  assert.equal(statusCode, 400);
  assert.deepEqual(payload, { message: 'Email and password required' });
  assert.equal(nextCalled, false);
});

test('loginValidator allows a valid login payload', () => {
  const req = { body: { email: 'user@example.com', password: 'password123' } };
  let statusCode;
  let payload;

  const res = {
    status(code) {
      statusCode = code;
      return {
        json(data) {
          payload = data;
        }
      };
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  loginValidator(req, res, next);

  assert.equal(statusCode, undefined);
  assert.equal(payload, undefined);
  assert.equal(nextCalled, true);
});
