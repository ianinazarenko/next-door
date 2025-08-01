// import Image from 'next/image';
import { Tab, TabGroup, TabList } from '@headlessui/react';

export default function Home() {
    return (
        <div className={'page'}>
            <div className={'container'}>
                <h1 className={'h1'}>hello world!</h1>

                <div className={'tabs'}>
                    <TabGroup>
                        <TabList>
                            <Tab className="data-hover:underline data-selected:bg-blue-500 data-selected:text-white">
                                Tab 1
                            </Tab>
                            <Tab>Tab 2</Tab>
                            <Tab>Tab 3</Tab>
                        </TabList>
                    </TabGroup>
                </div>

                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold">Привет от Tailwind!</h1>
                    <p className="mt-2">Эти стили должны быть применены.</p>
                </div>
            </div>
        </div>
    );
}
