import { CalendarIcon } from "@heroicons/react/24/outline"
import { JsxElement } from "typescript"
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Box = ({ icon, title, expectation, Result, Percent, chartColor }: any): JSX.Element => {
    console.log(expectation)
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

                    }
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: ["red"],
                }
            },
        },


    }
    return (
        <>
            <div className="mt-2 box py-3 px-3 rounded">
                <div className="columns-2  col">
                    <div className='text-[#00a8e8] font-bold'>
                        {icon}
                        <span>{title}</span>
                    </div>
                    <span className='bg-[rgba(220,53,69,.12)]  text-[#ff006e] rounded px-2 float-right'> Passed </span>
                </div>
                <div className="float-right mt-8 relative left-5 -top-2">
                    <Chart options={config.options} series={[2]} type="radialBar" width="110" height="110" />
                </div>
                <div className="columns-2 mt-10">
                    <p className="text-[#676d7d]">{expectation[0]}</p>
                    <p className="text-[#676d7d] float-right">{expectation[1]}</p>
                </div>
                <div className="columns-2 ">
                    <p className="text-[#00a8e8]">{Result[0]}</p>
                    <p className="text-[#ff206e] float-right">{Result[1]}</p>
                </div>

            </div>
        </>
    )
}

export default Box