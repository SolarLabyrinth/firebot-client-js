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
  GetEffectQueuesSchema,
  GetEffectQueueSchema,
  GetTimersSchema,
  GetTimerSchema,
  GetCustomVariablesSchema,
  GetCustomVariableValueSchema,
  GetReplaceVariablesSchema,
} from "./schemas.js";

export class FirebotClient {
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
  private async post(endpoint: string, body?: unknown) {
    const url = new URL(endpoint, this.baseUrl);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    const json = await response.json();
    return json;
  }

  // Status

  async getStatus() {
    const json = await this.get("/api/v1/status");
    return GetStatusSchema.parse(json);
  }

  // Effects

  async getEffects() {
    try {
      const json = await this.get("/api/v1/effects");
      return GetEffectsSchema.parse(json);
    } catch {
      return [];
    }
  }
  async getEffect(id: string) {
    try {
      const json = await this.get(`/api/v1/effects/${id}`);
      return GetEffectSchema.parse(json);
    } catch {
      return null;
    }
  }
  async getPresetEffectLists() {
    try {
      const json = await this.get(`/api/v1/effects/preset`);
      return GetPresetEffectListsSchema.parse(json);
    } catch {
      return [];
    }
  }

  // Custom Variables

  async getCustomVariables() {
    try {
      const json = await this.get(`/api/v1/custom-variables`);
      return GetCustomVariablesSchema.parse(json);
    } catch {
      return null;
    }
  }
  async getCustomVariable(name: string) {
    try {
      const json = await this.get(`/api/v1/custom-variables/${name}`);
      return GetCustomVariableValueSchema.parse(json);
    } catch {
      return {};
    }
  }
  async setCustomVariable(name: string, data: any, ttl: number) {
    await this.post(`/api/v1/custom-variables/${name}`, { data, ttl });
  }

  // Replace Variables

  async getReplaceVariables() {
    try {
      const json = await this.get("/api/v1/variables");
      return GetReplaceVariablesSchema.parse(json);
    } catch {
      return [];
    }
  }

  // Viewers

  async getViewers() {
    try {
      const json = await this.get(`/api/v1/viewers`);
      return GetViewersSchema.parse(json);
    } catch {
      return [];
    }
  }
  async exportViewers() {
    try {
      const json = await this.get(`/api/v1/viewers/export`);
      return ExportViewersSchema.parse(json);
    } catch {
      return [];
    }
  }
  async getViewer(id: string) {
    try {
      const json = await this.get(`/api/v1/viewers/${id}`);
      return GetViewerSchema.parse(json);
    } catch {
      return null;
    }
  }

  // Counters

  async getCounters() {
    try {
      const json = await this.get(`/api/v1/counters`);
      return GetCountersSchema.parse(json);
    } catch {
      return [];
    }
  }
  async getCounter(counterId: string) {
    try {
      const json = await this.get(`/api/v1/counters/${counterId}`);
      return CountersSchema.parse(json);
    } catch {
      return null;
    }
  }
  async updateCounter(counterId: string, value: number, override?: boolean) {
    const json = await this.post(`/api/v1/counters/${counterId}`, {
      value,
      override,
    });
    return CounterUpdateResponseSchema.parse(json);
  }

  // Timers

  async getTimers() {
    try {
      const json = await this.get(`/api/v1/timers`);
      return GetTimersSchema.parse(json);
    } catch {
      return [];
    }
  }
  async getTimer(timerId: string) {
    try {
      const json = await this.get(`/api/v1/timers/${timerId}`);
      return GetTimerSchema.parse(json);
    } catch {
      return null;
    }
  }
  async enableTimer(timerId: string) {
    await this.get(`/api/v1/timers/${timerId}/enable`);
  }
  async disableTimer(timerId: string) {
    await this.get(`/api/v1/timers/${timerId}/disable`);
  }
  async toggleTimer(timerId: string) {
    await this.get(`/api/v1/timers/${timerId}/toggle`);
  }
  async clearTimer(timerId: string) {
    await this.get(`/api/v1/timers/${timerId}/clear`);
  }

  // Effect Queues

  async getEffectQueues() {
    try {
      const json = await this.get(`/api/v1/queues`);
      return GetEffectQueuesSchema.parse(json);
    } catch {
      return [];
    }
  }
  async getEffectQueue(queueId: string) {
    try {
      const json = await this.get(`/api/v1/queues/${queueId}`);
      return GetEffectQueueSchema.parse(json);
    } catch {
      return null;
    }
  }
  async pauseEffectQueue(queueId: string) {
    try {
      const json = await this.post(`/api/v1/queues/${queueId}/pause`);
      return GetEffectQueueSchema.parse(json);
    } catch {
      return null;
    }
  }
  async resumeEffectQueue(queueId: string) {
    try {
      const json = await this.post(`/api/v1/queues/${queueId}/resume`);
      return GetEffectQueueSchema.parse(json);
    } catch {
      return null;
    }
  }
  async toggleEffectQueue(queueId: string) {
    try {
      const json = await this.post(`/api/v1/queues/${queueId}/toggle`);
      return GetEffectQueueSchema.parse(json);
    } catch {
      return null;
    }
  }
  async clearEffectQueue(queueId: string) {
    try {
      const json = await this.post(`/api/v1/queues/${queueId}/clear`);
      return GetEffectQueueSchema.parse(json);
    } catch {
      return null;
    }
  }
}
