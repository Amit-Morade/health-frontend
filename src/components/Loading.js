import { CircularProgress } from "@mui/material"

export default function Loading(){
    return (
        <div className="flex justify-center">
            <div className="flex flex-row items-center p-2">
                <span className="mr-4 text-sky-700 font-normal text-xl">Loading</span>
                <CircularProgress />
            </div>
        </div>
    )
}