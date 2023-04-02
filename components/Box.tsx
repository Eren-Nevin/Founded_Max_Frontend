import { JsxElement } from "typescript"
import dynamic from 'next/dynamic'
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
  
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Box = ({ icon, title, expectation, Result, Percent, Passed, ReachedColor, ReachedBgcolor, chartColor }: any): JSX.Element => {
    const config: any = {
        options: {
            colors: [chartColor],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        show: false,
                        total: {
                            show: false,
                            label: 'TOTAL'
                        }
                    },
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: ["blue"],
                }
            },
        },
    };
    const reachedStyle: any = {
        passed: {
            color: ReachedColor
        },
        icon: {
        	color: ReachedColor,
        	mr: 1
        },
        passedBg: {
            minWidth: '110px',
            float:' right',
            bgcolor: ReachedBgcolor,
            borderRadius: 2,
            px: 1,
            textAlign: 'center'
        },
    };
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down('lg'));
    
    return (
        <>
            <Grid
                container
                direction="column"
                sx={{ 
                	bgcolor: '#1e1f21',
                	borderRadius: 2,
                	my:2, mx:1, py:3, px:3
                }}
            >
                <Grid
                    display="flex"
                    alignItems='flex-start'
                    justifyContent='center'
                    container
                    direction={ tablet ? 'column' : 'row' }
                    sx={{ flexWrap: "wrap" }}
                >
                    <Grid
                        container
                        item
                        direction="row"
                        xs={9}
                        alignItems='center'
                        sx={{ fontFamily: '#00a8e8' }}
                    >
                        <Grid sx={reachedStyle.icon}>{icon}</Grid>
                        <Typography sx={reachedStyle.passed}>{title}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={reachedStyle.passedBg} >
                    	<Typography sx={reachedStyle.passed}>{Passed}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction={ tablet ? 'column' : 'row' }
                >
                    <Grid
                        container
                        item
                        direction="column"
                        xs={10}
                        sx={{ flexWrap: "wrap", mt: 2 }}
                    >
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="space-between"
                            xs={7}
                        >
                            <Typography sx={{ color: '#676d7d' }}>{expectation[0]}</Typography>
                            <Typography sx={{ color: '#676d7d' }}>{expectation[1]}</Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="space-between"
                            xs={5}
                        >
                            <Typography sx={reachedStyle.passed}>{Result[0]}</Typography>
                            <Typography sx={reachedStyle.passed}>{Result[1]}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item 
                        xs={2}
                    >
                        <Chart
                            options={config.options}
                            series={[Percent]} type="radialBar"
                            width="110"
                            height="110"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Box
