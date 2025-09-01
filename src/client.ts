import {
  GetStatusSchema,
  GetEffectsSchema,
  GetEffectSchema,
  GetPresetEffectListsSchema,
  GetViewersSchema,
  GetViewerSchema,
  ExportViewersSchema,
  GetCountersSchema,
  CountersSchema,
  CounterUpdateResponseSchema,
} from "./schemas.js";

export class FirebotApi {
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
      headers: {
        "Content-Type": "application/json",
      },
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

  // Counters

  async getCounters() {
    const json = await this.get(`/api/v1/counters`);
    const data = GetCountersSchema.parse(json);
    return data;
  }
  async getCounter(counterId: string) {
    const json = await this.get(`/api/v1/counters/${counterId}`);
    const data = CountersSchema.parse(json);
    return data;
  }
  async updateCounter(counterId: string, value: number, override?: boolean) {
    const json = await this.post(`/api/v1/counters/${counterId}`, {
      value,
      override,
    });
    const data = CounterUpdateResponseSchema.parse(json);
    return data;
  }
}
