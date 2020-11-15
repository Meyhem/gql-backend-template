import _ from 'lodash'
import { verify } from 'jsonwebtoken'

import { config } from '../config'
import { Auth } from '../context'
import { RoleName } from '../entity/Role'

export function parseAuthorization(header?: string): Auth {
  const unautheticated: Auth = {
    isAuthenticated: false,
    id: null,
    role: null
  }

  if (!header) {
    return unautheticated
  }

  const [bearer, token] = _.split(header, ' ')

  if (_.toLower(bearer) !== 'bearer') {
    return unautheticated
  }

  const parsed = verify(token, config.JWT_SECRET)

  if (!_.isObject(parsed)) {
    return unautheticated
  }

  if (!_.has(parsed, 'id') || !_.has(parsed, 'role')) {
    return unautheticated
  }

  const verified = parsed as { id: number; role: RoleName }

  return {
    isAuthenticated: true,
    id: verified.id,
    role: verified.role
  }
}
