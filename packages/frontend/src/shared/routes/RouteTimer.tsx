import React from 'react'
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSendPageTimeMutation } from '../api/activity_MonitoringhApi'
const RouteTimer = () => {

    const location = useLocation();
    const enterTimeRef = useRef(Date.now());
    const [sendPageTime] = useSendPageTimeMutation();

    useEffect(() => {
        const leaveTime = Date.now();
        const timeSpentSec = Math.floor((leaveTime - enterTimeRef.current) / 1000);

        console.log("עמוד:", location.pathname, "שניות שהייה:", timeSpentSec);
        sendPageTime({
            page: location.pathname,
            timeSpentSec,
        })
        enterTimeRef.current = Date.now();
    }, [location.pathname]);
    return (
        <div>




        </div>
    )
}

export default RouteTimer



