class LoggedInUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { refreshToken } = payload;

    this.refreshToken = refreshToken;
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('LOGGEDIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('LOGGEDIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = LoggedInUser;
