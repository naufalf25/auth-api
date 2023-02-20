const LoginUser = require('../LoginUser');

describe('A Login User entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
    };

    // Action & Assert
    expect(() => new LoginUser(payload)).toThrowError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      username: true,
      password: 123,
    };

    // Action & Assert
    expect(() => new LoginUser(payload)).toThrowError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'dico ding',
      password: 'abc',
    };
    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError('LOGIN_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create loginUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 'secret_password',
    };

    // Action
    const { username, password } = new LoginUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
