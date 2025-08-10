import { defineStore } from "pinia";

const ALERT_MODES = ["success", "warning", "error"] as const;

type alertMode = typeof ALERT_MODES[number];

interface Alert {
    id: number;
    mode: alertMode;
    text: string;
    show: boolean;
}

export const useAlert = defineStore("AlertStore", {
    state: () => ({
        alerts: [] as Alert[],
    }),

    actions: {
        openAlert(modeIndex: number, text: string, duration = 3000) {
            const id = Date.now() + Math.random();
            const mode = ALERT_MODES[modeIndex] || "success";

            this.alerts.push({
                id,
                mode,
                text,
                show: true
            });

            setTimeout(() => {
                // حذف اولین alert فقط اگر id همون id باشه
                this.closeAlert(id);
            }, duration);
        },

        closeAlert(id:number) {
            this.alerts = this.alerts.filter(a => a.id !== id);
        },

        shiftAlert() {
            this.alerts.shift();
        }
    }
});
