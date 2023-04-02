import { JsxElement } from "typescript"
import dynamic from 'next/dynamic'
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
  
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Box = ({ icon, title, expectation, Result, Passed, Percent, chartColor }: any): JSX.Element => {
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
                        <Grid sx={{ color: '#00a8e8', mr: 1 }}>{icon}</Grid>
                        <Typography sx={{ color: '#00a8e8' }}>{title}</Typography>
                    </Grid>
                    <Grid
                    	item
                    	xs={3}
                    	sx={{
                    		minWidth: '110px' ,
                            float:' right',
                    		bgcolor: 'rgb(220 53 69 / 12%)',
                    		borderRadius: 2,
                    		px: 1,
                            textAlign: 'center'
                    	}}
                    >
                    	<Typography sx={{ color: '#ff006e', }}>{Passed}</Typography>
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
                            <Typography sx={{ color: '#00a8e8' }}>{Result[0]}</Typography>
                            <Typography sx={{ color: '#ff206e' }}>{Result[1]}</Typography>
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
