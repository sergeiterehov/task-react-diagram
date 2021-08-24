export function fetchDashboard() {
	const data = {
        widgets: [
            {
                id: 1,
                title: "Мои доходы",
                series: [
                    { id: 1, name: "Работа", color: "#00AA55" },
                    { id: 2, name: "YouTube", color: "#AA0000" },
                ],
                data: [
                    { seriesId: 1, date: "2021-01-01", value: 120000 },
                    { seriesId: 1, date: "2021-02-01", value: 90000 },
                    { seriesId: 1, date: "2021-03-01", value: 130000 },
                    { seriesId: 1, date: "2021-04-01", value: 120000 },
                    { seriesId: 1, date: "2021-05-01", value: 140000 },
                    { seriesId: 1, date: "2021-06-01" },
                    { seriesId: 2, date: "2021-01-01" },
                    { seriesId: 2, date: "2021-02-01", value: 32000 },
                    { seriesId: 2, date: "2021-03-01", value: 90000 },
                    { seriesId: 2, date: "2021-04-01", value: 200000 },
                    { seriesId: 2, date: "2021-05-01" },
                    { seriesId: 2, date: "2021-06-01", value: 60000 },
                ],
            },
        ],
    };

	return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(JSON.stringify(data)));
        }, 1500);
    });
}
