const LoginUser = require('../../Domains/authentications/entities/LoginUser');

class AddTokenUseCase {
  constructor({ authenticationRepository, tokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    const loginUser = new LoginUser(useCasePayload);
    await this._authenticationRepository.verifyUsername(loginUser.username);
    await this._authenticationRepository.verifyPassword(loginUser.password);
    const refreshToken = await this._tokenManager.generateRefreshToken(loginUser.username);
    await this._authenticationRepository.addToken(refreshToken);
    return refreshToken;
  }
}

module.exports = AddTokenUseCase;
