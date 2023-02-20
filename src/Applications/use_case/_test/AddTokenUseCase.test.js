const AuthenticationRepoitory = require('../../../Domains/authentications/AuthenticationRepoitory');
const LoginUser = require('../../../Domains/authentications/entities/LoginUser');
const LoggedInUser = require('../../../Domains/authentications/entities/LoggedInUser');
const TokenManager = require('../../security/TokenManager');
const AddTokenUseCase = require('../AddTokenUseCase');

describe('AddTokenUseCase', () => {
  it('should orchestrating the add token action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'super_secret_password',
    };
    const expectedLoggedInUser = new LoggedInUser({
      refreshToken: '123',
    });

    /* creating dependency of use case */
    const mockAuthenticationRepository = new AuthenticationRepoitory();
    const mockTokenManager = new TokenManager();

    /* mocking needed function */
    mockAuthenticationRepository.verifyUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.verifyPassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('123'));
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedLoggedInUser));
    
    /* creating use case instance */
    const getAddTokenUseCase = new AddTokenUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    // Action
    const loggedInUser = await getAddTokenUseCase.execute(useCasePayload);

    // Assert
    expect(loggedInUser).toStrictEqual(expectedLoggedInUser.refreshToken);
    expect(mockAuthenticationRepository.verifyUsername).toBeCalledWith(useCasePayload.username);
    expect(mockAuthenticationRepository.verifyPassword).toBeCalledWith(useCasePayload.password);
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(loggedInUser);
  });
});
