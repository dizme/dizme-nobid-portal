import Link from "next/link";

type Props = {
    id: string;
    title: string;
    issuer: {
        name: string;
        image: string;
        country: string;
    };
    description?: string;
};

export default function Credential({
    id,
    title,
    issuer,
    description,
}: Props) {
    const blueDark = 'bg-gradient-to-r from-primary-400 to-primary-600 z-[-2]';

    return (
        <Link href={`/credentials/${id}`}>
            <div
                className={`drop-shadow-sm flex flex-col
     rounded-xl py-7 px-8 text-white h-[225px] w-[360px] cursor-pointer overflow-hidden ${blueDark}`}
            >
                <div className="mb-4">
                    <h6 className={'text-2xl font-bold '}>{title.length > 20 ? title.substring(0, 20) + '...' : title}</h6>
                    <span>{description}</span>
                </div>
                <div className="flex flex-row">
                    <img
                        src={issuer.image}
                        alt={issuer.name}
                        className="h-15 w-15 bg-white rounded-xl" style={{ width: 'auto' }}></img>
                </div>
            </div>
        </Link>
    );
}
