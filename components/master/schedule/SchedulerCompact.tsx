import { Box } from "@chakra-ui/react";
import { ScheduleData, Utils } from "../../../types/base";

export default function SchedulerCompact ({day, hour, utils, data}: {day: number, hour: number, utils: Utils, path: string, data: ScheduleData}) {

    return <Box>
        Compact
        {day} - {hour}
    </Box>
}