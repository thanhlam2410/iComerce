import { createMockRequest } from '../../../test_helpers/create_mock_request';
import { loginAdminAccountValidator } from '../admin_login';
import { test } from 'mocha';

describe('loginAdminAccountValidator', () => {
  test('should validate input', () => {
    loginAdminAccountValidator(createMockRequest({}));
  });
});
