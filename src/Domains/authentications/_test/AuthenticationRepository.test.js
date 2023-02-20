const AuthenticationRepository = require('../AuthenticationRepoitory');

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository();

    // Action & Assert
    await expect(authenticationRepository.addToken({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.verifyUsername({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.verifyPassword({})).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
