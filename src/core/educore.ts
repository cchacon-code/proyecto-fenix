import { identityService } from './identity/index';
import { sessionService } from './session/index';
import { organizationService } from './organization/index';

export const EduCore = {
  identity: identityService,
  session: sessionService,
  organization: organizationService,
};