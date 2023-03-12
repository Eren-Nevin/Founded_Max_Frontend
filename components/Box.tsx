import { CalendarIcon } from "@heroicons/react/24/outline"
import { JsxElement } from "typescript"
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Box = (): JSX.Element => {
    const config: any = {
        options: {
            colors: ["red"],
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
                    <div className='text-[#30d5f1] font-bold'>
                        <CalendarIcon className="h-5 mr-2  inline-block" />
                        <span>Minimum trading days</span>
                    </div>
                    <span className='bg-[rgba(220,53,69,.12)]  text-[#dc3545] rounded px-2 float-right'> Passed </span>
                </div>
                {/*  */}
                <div className="float-right mt-8 relative left-5 -top-2">
                    <Chart options={config.options} series={[2]} type="radialBar" width="110" height="110" />
                </div>
                <div className="columns-2 mt-10">
                    <p className="text-[#676d7d]">Minimum:</p>
                    <p className="text-[#676d7d] float-right">1 Day</p>
                </div>
                <div className="columns-2 ">
                    <p className="text-[#30d5f1]">Current result:</p>
                    <p className="text-[red] float-right">0 Day</p>
                </div>

            </div>
        </>
    )
}

export default Box