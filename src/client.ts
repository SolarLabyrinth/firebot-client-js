import { z } from "zod/mini";

const GetStatusSchema = z.object({
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

const GetEffectsSchema = z.array(EffectSchema);
const GetEffectSchema = EffectSchema;

const GetPresetEffectListsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    args: z.array(z.string()),
  })
);

const ViewerSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
});

const GetViewersSchema = z.array(ViewerSchema);

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

const ExportViewersSchema = z.array(ViewerExportSchema);
const GetViewerSchema = ViewerExportSchema;

export class FireBotApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async get(endpoint: string) {
    const url = new URL(endpoint, this.baseUrl);
    const response = await fetch(url.toString(), {
      method: "GET",
    });
    const json = await response.json();
    return json;
  }
  private async post(endpoint: string, body: unknown) {
    const url = new URL(endpoint, this.baseUrl);
    const response = await fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json;
  }

  // Status

  async getStatus() {
    const json = await this.get("/api/v1/status");
    const data = GetStatusSchema.parse(json);
    return data;
  }

  // Effects

  async getEffects() {
    const json = await this.get("/api/v1/effects");
    const data = GetEffectsSchema.parse(json);
    return data;
  }
  async getEffect(id: string) {
    const json = await this.get(`/api/v1/effects/${id}`);
    const data = GetEffectSchema.parse(json);
    return data;
  }

  async getPresetEffectLists() {
    const json = await this.get(`/api/v1/effects/preset`);
    const data = GetPresetEffectListsSchema.parse(json);
    return data;
  }

  // Custom Variables

  async getCustomVariables() {
    const json = await this.get(`/api/v1/custom-variables`);
    return json;
  }
  async getCustomVariable(name: string) {
    const json = await this.get(`/api/v1/custom-variables/${name}`);
    return json;
  }
  async setCustomVariable(name: string, value: any, ttl: number) {
    const json = await this.post(`/api/v1/custom-variables/${name}`, {
      data: value,
      ttl,
    });
    return json;
  }

  // Viewers

  async getViewers() {
    const json = await this.get(`/api/v1/viewers`);
    const data = GetViewersSchema.parse(json);
    return data;
  }
  async getViewer(id: string) {
    const json = await this.get(`/api/v1/viewers/${id}`);
    const data = GetViewerSchema.parse(json);
    return data;
  }
  async exportViewers() {
    const json = await this.get(`/api/v1/viewers/export`);
    const data = ExportViewersSchema.parse(json);
    return data;
  }
}
