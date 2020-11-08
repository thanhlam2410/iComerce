import { createMockDataModel } from '../../../test_helpers/create_mock_data_model';
import { createMockRequest } from '../../../test_helpers/create_mock_request';
import { createMockResponse } from '../../../test_helpers/create_mock_response';
import { loginAdminAccount, loginAdminAccountValidator } from '../admin_login';

jest.mock('../helper', () => {
  return {
    createJWTToken: jest.fn().mockReturnValue('test token')
  };
});

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

describe('loginAdminAccount', () => {
  const BACKUP_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...BACKUP_ENV };
  });

  afterAll(() => {
    process.env = BACKUP_ENV;
  });

  test('should work', async () => {
    const mockSendFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ send: mockSendFn });
    const mockAccountSearchFn = createMockDataModel(
      {
        email: 'lamttt@mailnesia.com',
        password:
          '$2b$10$EB7NOxFiLyxnQFJMdFvqIu72Nc8swjkIMm3s8xo.jh2KmPv5vMq/K',
        name: 'Lam Tran'
      },
      true
    );

    await loginAdminAccount(
      {
        email: 'lamttt@mailnesia.com',
        password: '12345'
      },
      createMockRequest({
        adminAccountModel: {
          findOne: mockAccountSearchFn
        }
      }),
      createMockResponse({
        status: mockStatusFn,
        send: mockSendFn
      })
    );

    expect(mockStatusFn).not.toBeCalled();
    expect(mockSendFn).toBeCalledWith({
      token: 'test token'
    });
  });
});
