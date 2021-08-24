import { useState, useEffect, useCallback, useMemo, memo, Fragment } from 'react';
import "./Diagram.css";

const months = {
    0: "Янв.",
    1: "Фев.",
    2: "Мар.",
    3: "Апр.",
    4: "Май.",
    5: "Июн.",
    6: "Июл.",
    7: "Авг.",
    8: "Сен.",
    9: "Окт.",
    10: "Ноя.",
    11: "Дек.",
};

export const Diagram = memo(function Diagram({ widget }) {
	return (
        <Fragment>
            <div className="widget-title">{widget.title}</div>
            <div className="diagram">
                Рисовать здесь
            </div>
        </Fragment>
    );
});
