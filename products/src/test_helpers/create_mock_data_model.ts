export const createMockDataModel = (
  mockReturnValue: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
  promise = false
) => {
  const mockFn = jest.fn();

  if (promise) {
    return mockFn.mockResolvedValue(mockReturnValue);
  } else {
    return mockFn.mockReturnValue(mockReturnValue);
  }
};
