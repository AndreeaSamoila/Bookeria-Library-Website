import {useEffect, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {Box} from "@mui/material";

export function ScrollToTop() {

    const [scrollTop, setScrollTop] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const viewportHeight = window.innerHeight;
            if (window.scrollY > viewportHeight/2) {
                setScrollTop(true);
            } else {
                setScrollTop(false);
            }
        });
    }, []);

const handleScrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

return(
    <Box>
        {   scrollTop && (
            <Tooltip title="Scroll to top" placement="top">
            <Box component="button" onClick={handleScrollTop}
            style={{
            position:"fixed",
            bottom:"20px",
            right:"20px",
            border:'1px solid grey',
            borderRadius: '50%',
            cursor:"pointer",
            width:"50px",
            height:"50px"
        }}
            variant="rounded">
            <ArrowUpwardIcon color="black"/>
            </Box>
            </Tooltip>
                )}
        </Box>
)};
