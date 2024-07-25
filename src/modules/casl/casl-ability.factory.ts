import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { ITokenPayload, ObjectName, PermissionAction } from '@/type/auth.type';

export type PossibleAbilities = [PermissionAction, ObjectName];
type Conditions = MongoQuery;
export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: ITokenPayload) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );
    const permissions = user.permissions;

    for (const permission of permissions) {
      can(permission.action, permission.object);
    }

    return build();
  }
}
