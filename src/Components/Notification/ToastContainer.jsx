import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCheckmarkCircle, IoAlertCircle, IoInformationCircle, IoClose } from 'react-icons/io5';
import { hideNotification } from '../../store/slices/notificationSlice';
import styles from './ToastContainer.module.css';
import { selectNotifications } from '../../store/selectors';
import clsx from 'clsx';

export default function ToastContainer() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector(selectNotifications);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <IoCheckmarkCircle size={22} style={{ color: '#10b981', flexShrink: 0 }} />;
      case 'error':
        return <IoAlertCircle size={22} style={{ color: '#ef4444', flexShrink: 0 }} />;
      default:
        return <IoInformationCircle size={22} style={{ color: '#3b82f6', flexShrink: 0 }} />;
    }
  };

  const getSeverityClass = () => {
    switch (severity) {
      case 'success':
        return styles.toastSuccess;
      case 'error':
        return styles.toastError;
      default:
        return styles.toastInfo;
    }
  };

  return (
    <div className={clsx(styles.toastWrapper)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={clsx(styles.toast, getSeverityClass())}
          >
            {getIcon()}
            <span className={clsx(styles.toastMessage)}>{message}</span>
            <button
              className={clsx(styles.toastClose)}
              onClick={() => dispatch(hideNotification())}
            >
              <IoClose size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
