import { Fragment } from 'react';

const events = [
    {
        heading: "2021 : The Spark of an Idea",
        subHeading: "During countless late-night study sessions, we began brainstorming ways to enhance campus life. We envisioned Youpi—a revolutionary app designed to streamline food ordering and delivery within our bustling university. Driven by a shared mission, we embarked on a journey to transform this idea into a reality.",
        direction: "right",
    },
    {
        heading: "2022: Building the Foundation",
        subHeading: "Our focus was on laying the groundwork. Balancing our studies and development work, we dedicated ourselves to mastering app development. We spent countless hours coding, debugging, and refining our concept. BINUS University served as our testing ground, providing invaluable feedback from fellow students and faculty.",
        direction: "left",
    },
    {
        heading: "2023: From Concept to Reality",
        subHeading: "We conducted a beta test at BINUS, receiving overwhelming support from students who appreciated the convenience of ordering food without leaving their study spots. This year was marked by continuous improvements and the addition of new features based on user feedback, making Youpi more user-friendly and efficient.",
        direction: "right",
    },
    {
        heading: "2024: Scaling New Heights",
        subHeading: "Youpi is no longer just a campus solution but a full-fledged business. We are now expanding our reach beyond BINUS University, aiming to bring the same convenience to other universities facing similar challenges. Our journey from university friends to tech entrepreneurs serves as an inspiration to many, showcasing how a shared vision and relentless effort can create impactful change.",
        direction: "left",
    },
]

const Timeline = () => {
    return (
        <div className='flex flex-col gap-y-3 w-full my-4'>
            <Circle/>
            
            {events.map((event : any, key : any) => {
                return <Fragment key={key}>
                    <div className='grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto'>
                        {event.direction === 'left' ? (
                            <EventCard heading={event.heading} subHeading={event.subHeading}/>
                        ) : (
                            <div>
                                
                            </div>
                        )}

                        <Pillar/>

                        {event.direction === 'right' ? (
                            <EventCard heading={event.heading} subHeading={event.subHeading}/>
                        ) : (
                            <div>
                                
                            </div>
                        )}
                    </div>

                    {key < (events.length - 1) && <Circle/>}
                </Fragment>
            })}

            <Circle/>
        </div>
    )
}

export default Timeline

const Circle = () => {
    return (
        <div className='rounded-full w-4 h-4 bg-primary mx-auto'>
            
        </div>
    )
}

const Pillar = () => {
    return (
        <div className='rounded-t-md rounded-b-md w-1.5 h-full bg-slate-700 mx-auto'>
            
        </div>
    )
}

const EventCard = ({heading, subHeading} : any) => {
    return (
        <div className='flex flex-col gap-y-2 border shadow-md rounded-xl p-4'>
            <div className='text-red-800 font-bold text-xl border-b'>{heading}</div>
            <div className='text-sm text-gray-700'>{subHeading}</div>
        </div>
    )
}