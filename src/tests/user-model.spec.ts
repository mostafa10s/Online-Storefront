import UserModel from '../models/ueser.model'

describe('User Model Tests', () => {
  var userModel = new UserModel()

  it('[create_User Method]', async () => {
    const newUser = await userModel.create({
      last_name: 'admin1',
      first_name: 'admin1',
      passworde: '1234567',
      user_name: 'admin1'
    })

    expect(newUser.user_id).toBeGreaterThan(0)
    expect(newUser.first_name).not.toBeNull()
    expect(newUser.last_name).not.toBeNull()
    expect(newUser.passworde).not.toBeNull()
  })

  it('Should login by username, password', async () => {
    const newUser = await userModel.backPassword('admin1', '1234567')
    expect(newUser!.first_name).not.toBeNull()
    expect(newUser!.last_name).not.toBeNull()
    expect(newUser!.user_name).not.toBeNull()
  })
})
