import { useLang } from '@/context/LangContext';

export default function StartForm() {
    const { t } = useLang();
    return (
        <>
            <div className="flex flex-col gap-2">
                <section className="bg-[gray]/5 p-2 rounded-lg">
                    <p className="m-2">{t('addStore.startformheading')}</p>
                    <ul>
                        <li>1. Set the name of your store.</li>
                        <li>2. Choose in which category your store is.</li>
                        <li>3. Pick the address of your store.</li>
                    </ul>
                    <p>After you are done you will be able to customize your store further.</p>
                </section>
            </div>
        </>
    );
}
