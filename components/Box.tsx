// import { CalendarIcon } from "@heroicons/react/24/outline"
import { JsxElement } from "typescript"
import dynamic from 'next/dynamic'
import {
    // Box,
    Grid,
    Modal,
    Stack,
    Button,
    Divider,
    TextField,
    Typography,
    ImageListItem,
  } from "@mui/material";
  
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Box = ({ icon, title, expectation, Result, Passed, Percent, chartColor }: any): JSX.Element => {
    // console.log(expectation)
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
    }
    
    return (
        <>
            <Grid
                container
                item
                display='inline-flex'
                direction="column"
                sx={{ 
                	bgcolor: '#1e1f21',
                	borderRadius: 2,
                	my:2,
                	mx:1,
                	py:3,
                	px:3,
                	width: '350px'
                }}
                //xs={6}
            >
                <Grid
                    container
                    direction="row"
                    sx={{
                    	flexWrap: "wrap"
                    }}
                >
                    <Grid
                        container
                        item
                        direction="row"
                        xs={9}
                        sx={{ fontFamily: '#00a8e8' }}
                    >
                        {icon}
                        <Typography>{title}</Typography>
                    </Grid>
                    <Grid
                    	item
                    	xs={3}
                    	sx={{
                    		float:' right',
                    		bgcolor: 'rgb(220 53 69 / 12%)',
                    		borderRadius: 2,
                    		px: 1
                    	}}
                    >
                    	<Typography sx={{ color: '#ff006e', }}> {Passed} </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                >
                    <Grid
                        container
                        item
                        direction="row"
                        spacing={-2}
                        xs={10}
                        sx={{ flexWrap: "wrap", mt: 2 }}
                    >
                        <Grid
                            container
                            item
                            direction="column"
                            alignItems="flex-start"
                            xs={7}
                        >
                            <Typography sx={{ color: '#676d7d' }}>{expectation[0]}</Typography>
                            <Typography sx={{ color: '#00a8e8' }}>{Result[0]}</Typography>
                            
                        </Grid>
                        <Grid
                            container
                            item
                            direction="column"
                            alignItems="flex-end"
                            xs={5}
                        >
                            <Typography sx={{ color: '#676d7d' }}>{expectation[1]}</Typography>
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


{/* <div className="mt-2 box py-3 px-3 rounded">
    <div className="columns-2  col">
        <div className='text-[#00a8e8] font-bold'>
            {icon}
            <span>{title}</span>
        </div>
        <span className='bg-[rgba(220,53,69,.12)]  text-[#ff006e] rounded px-2 float-right'> Passed </span>
    </div>
    <div className="float-right mt-8 relative left-5 -top-2">
        <Chart
            options={config.options}
            series={[2]} type="radialBar"
            width="110"
            height="110"
        />
    </div>
    <div className="columns-2 mt-10">
        <p className="text-[#676d7d]">{expectation[0]}</p>
        <p className="text-[#676d7d] float-right">{expectation[1]}</p>
    </div>
    <div className="columns-2 ">
        <p className="text-[#00a8e8]">{Result[0]}</p>
        <p className="text-[#ff206e] float-right">{Result[1]}</p>
    </div>
</div> */}
