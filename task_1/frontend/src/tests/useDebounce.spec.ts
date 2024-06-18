import { ref, nextTick } from "vue";
import { useDebounce } from "@/composables/useDebounce";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should return the initial value immediately", () => {
    const value = ref("initial");
    const debouncedValue = useDebounce(value, 500);

    expect(debouncedValue.value).toBe("initial");
  });

  it("should update the debounced value after the specified delay", async () => {
    const value = ref("initial");
    const debouncedValue = useDebounce(value, 500);

    value.value = "updated";
    await nextTick();

    vi.advanceTimersByTime(499);
    expect(debouncedValue.value).toBe("initial");

    vi.advanceTimersByTime(1);
    expect(debouncedValue.value).toBe("updated");
  });

  it("should reset the delay if the value changes again before the delay has passed", async () => {
    const value = ref("initial");
    const debouncedValue = useDebounce(value, 500);

    value.value = "updated1";
    await nextTick();

    vi.advanceTimersByTime(300);
    expect(debouncedValue.value).toBe("initial");

    value.value = "updated2";
    await nextTick();

    vi.advanceTimersByTime(300);
    expect(debouncedValue.value).toBe("initial");

    vi.advanceTimersByTime(200);
    expect(debouncedValue.value).toBe("updated2");
  });

  it("should clear timeout on immediate option", async () => {
    const value = ref("initial");
    const debouncedValue = useDebounce(value, 500);

    value.value = "updated1";
    await nextTick();

    vi.advanceTimersByTime(100);
    expect(debouncedValue.value).toBe("initial");

    value.value = "updated2";
    await nextTick();

    vi.advanceTimersByTime(400);
    expect(debouncedValue.value).toBe("initial");

    vi.advanceTimersByTime(100);
    expect(debouncedValue.value).toBe("updated2");
  });
});
