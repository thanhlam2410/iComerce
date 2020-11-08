import { createMockRequest } from '../../../test_helpers/create_mock_request';
import { createMockResponse } from '../../../test_helpers/create_mock_response';
import { findShopHotline } from '../find_shop_hotline';
import { SHOP_INFO } from '../shop_info';

describe('findShopHotline', () => {
  test('should work', async () => {
    const mockSendFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ send: mockSendFn });

    await findShopHotline(
      {},
      createMockRequest({}),
      createMockResponse({
        status: mockStatusFn,
        send: mockSendFn
      })
    );

    expect(mockStatusFn).not.toBeCalled();
    expect(mockSendFn).toBeCalledWith(SHOP_INFO);
  });
});
