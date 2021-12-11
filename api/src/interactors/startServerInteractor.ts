import { ApplicationContext } from '../createApplicationContext';
import { startServerPersistence } from '../persistence/sqlite/startServerPersistence';
import { getServerPersistence } from '../persistence/sqlite/getServerPersistence';
import { getNodePersistence } from '../persistence/sqlite/getNodePersistence';
import { startServerCommand } from '../commands/startServerCommand';

type startServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const startServerInteractor = async ({
  applicationContext,
  serverId,
}: startServerInteractorOptions) => {
  const server = await getServerPersistence({ applicationContext, serverId });
  const node = await getNodePersistence({
    applicationContext,
    nodeId: server.nodeId,
  });
  startServerPersistence({
    applicationContext,
    serverId,
  });
  await startServerCommand({ server, node });
};
