import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import type { PossibleAbilities } from '@/modules/casl/casl-ability.factory';

export const CHECK_PERMISSION_KEY = 'check_permission_key';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CheckPermissions = (
  ...params: PossibleAbilities[]
): CustomDecorator => SetMetadata(CHECK_PERMISSION_KEY, params);
