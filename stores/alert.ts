import { defineStore } from "pinia";

const ALERT_MODES = ["success", "info", "warning", "error"] as const;

type alertMode = typeof ALERT_MODES[number];

interface Alert {
    id: number;
    mode: alertMode;
    text: string;
    show: boolean;
    duration: number | null;

}

export const useAlert = defineStore("AlertStore", {
    state: () => ({
        alerts: [] as Alert[],
    }),

    actions: {
        openAlert(modeIndex: number, text: string, duration: number | null = 4000) {

            if (this.alerts.length >= 3) {
                this.shiftAlert(); // اولین رو حذف کن
            }

            const id = Date.now() + Math.random();
            const mode = ALERT_MODES[modeIndex] || "success";

            this.alerts.push({
                id,
                mode,
                text,
                show: true,
                duration

            });

            if (duration && duration > 0) {
                setTimeout(() => {
                    this.closeAlert(id);
                }, duration);
            }
        },

        closeAlert(id:number) {
            this.alerts = this.alerts.filter(a => a.id !== id);
        },

        shiftAlert() {
            this.alerts.shift();
        }
    }
});
