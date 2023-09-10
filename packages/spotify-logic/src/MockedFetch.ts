// MockedFetch.ts
export const mockedFetch = jest.fn();

interface MockedResponseData {
  data: string;
}

export const mockResponse = (data: any, status = 200) => {
  const json = jest.fn().mockResolvedValue(data);
  const response = {
    ok: status >= 200 && status < 300,
    status,
    json,
    // Add other Response properties as needed
    // headers: new Headers(),
    // status: 200,
    // statusText: 'OK',
    // redirected: false,
    // ... other properties
  } as any as Response;

  mockedFetch.mockResolvedValue(response);
};
