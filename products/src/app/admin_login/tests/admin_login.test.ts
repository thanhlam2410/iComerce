import { createMockRequest } from '../../../test_helpers/create_mock_request';
import { loginAdminAccountValidator } from '../admin_login';

describe('loginAdminAccountValidator', () => {
  test('should validate input', async () => {
    const task = loginAdminAccountValidator(
      createMockRequest({
        body: {
          email: 'lamttt@mailnesia.com',
          password: '12345'
        }
      })
    );

    await expect(task).resolves.toEqual({
      email: 'lamttt@mailnesia.com',
      password: '12345'
    });
  });

  test('invalid email', async () => {
    const task = loginAdminAccountValidator(
      createMockRequest({
        body: {
          email: 'lamttt',
          password: '12345'
        }
      })
    );

    await expect(task).rejects.toEqual(
      new Error(`"email" must be a valid email`)
    );
  });
});
