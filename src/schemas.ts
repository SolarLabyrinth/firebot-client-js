import { z } from "zod/mini";

export const GetStatusSchema = z.object({
  connections: z.object({
    chat: z.boolean(),
  }),
});

const EffectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  categories: z.optional(z.array(z.string())),
  dependencies: z.optional(
    z.union([
      z.array(z.string()),
      z.object({
        twitch: z.boolean(),
      }),
    ])
  ),
  outputs: z.optional(
    z.array(
      z.object({
        label: z.string(),
        description: z.string(),
        defaultName: z.string(),
      })
    )
  ),
  exemptFromTimeouts: z.optional(z.boolean()),
  triggers: z.optional(
    z.object({
      command: z.boolean(),
      event: z.array(z.string()),
    })
  ),
  hidden: z.optional(z.boolean()),
});

export const GetEffectsSchema = z.array(EffectSchema);
export const GetEffectSchema = EffectSchema;

export const GetPresetEffectListsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    args: z.array(z.string()),
  })
);

export const ViewerSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
});

export const GetViewersSchema = z.array(ViewerSchema);

const ViewerExportSchema = z.object({
  _id: z.string(),
  username: z.string(),
  displayName: z.string(),
  profilePicUrl: z.string(),
  twitch: z.boolean(),
  twitchRoles: z.array(z.string()),
  online: z.boolean(),
  onlineAt: z.number(),
  lastSeen: z.number(),
  joinDate: z.number(),
  minutesInChannel: z.number(),
  chatMessages: z.number(),
  disableAutoStatAccrual: z.boolean(),
  disableActiveUserList: z.boolean(),
  disableViewerList: z.boolean(),
  metadata: z.record(z.string(), z.unknown()),
  currency: z.record(z.string(), z.unknown()),
  ranks: z.optional(z.record(z.string(), z.unknown())),
});

export const ExportViewersSchema = z.array(ViewerExportSchema);
export const GetViewerSchema = ViewerExportSchema;

export const CountersSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
});
export const GetCountersSchema = z.array(CountersSchema);

export const CounterUpdateResponseSchema = z.object({
  oldValue: z.number(),
  newValue: z.number(),
});

const EffectQueueSchema = z.object({
  id: z.string(),
  name: z.string(),
  mode: z.string(),
  sortTags: z.array(z.unknown()),
  active: z.boolean(),
  length: z.number(),
});
export const GetEffectQueuesSchema = z.array(EffectQueueSchema);
export const GetEffectQueueSchema = EffectQueueSchema;

export const GetTimersSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    active: z.boolean(),
  })
);
export const GetTimerSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  onlyWhenLive: z.boolean(),
  interval: z.number(),
  requiredChatLines: z.number(),
  sortTags: z.array(z.unknown()),
  effects: z.object({
    id: z.string(),
    list: z.array(z.unknown()),
  }),
});
