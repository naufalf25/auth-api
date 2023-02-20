const LoggedInUser = require('../LoggedInUser');

describe('A LoggedInUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: '123',
    };

    // Action & Assert
    expect(() => new LoggedInUser(payload)).toThrowError('LOGGEDIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      accessToken: 123,
      refreshToken: true,
    };

    // Action & Assert
    expect(() => new LoggedInUser(payload)).toThrowError('LOGGEDIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create loggedInUser object correctly', () => {
    // Arrange
    const payload = {
      accessToken: '123',
      refreshToken: '555',
    };

    // Action
    const { accessToken, refreshToken } = new LoggedInUser(payload);

    // Assert
    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
