import { getCLS, getFID, getLCP } from "https://unpkg.com/web-vitals?module";

function sendToGoogleAnalytics({ name, delta, id }) {
	gtag("event", name, {
		event_category: "Web Vitals",
		event_label: id,
		value: Math.round(name === "CLS" ? delta * 10000 : delta),
		non_interaction: true
	});
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
