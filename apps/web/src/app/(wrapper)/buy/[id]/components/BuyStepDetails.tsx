import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '@/components/ui/ServiceCard';
import StoreCard from '@/components/ui/StoreCard';
import { Button } from '@/components/ui/button';
import { IService } from '@/types';

const variants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
};

interface BuyStepDetailsParams {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    setFormStep: (step: 'details' | 'method' | 'delivery' | 'confirm') => void;
    service: IService;
}

export default function BuyStepDetails({ formStep, setFormStep, service }: BuyStepDetailsParams) {
    return (
        <>
            <AnimatePresence initial={false}>
                {formStep === 'details' && (
                    <motion.div
                        key="service-details"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={variants}
                    >
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Service Details
                                </h2>
                                <ServiceCard
                                    key={service._id}
                                    service={service}
                                    serviceList={false}
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Store Information
                                </h2>
                                <StoreCard
                                    key={service.store._id}
                                    store={service.store}
                                    user={null}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {formStep !== 'details' && (
                    <motion.div
                        key="collapsed-button"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div>
                            <Button
                                // onClick={handleConfirm}
                                onClick={() => setFormStep('details')}
                                // disabled={loading}
                                variant="confirmed_step"
                                className="justify-left"
                            >
                                Service Details Confirmed (click to view)
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
