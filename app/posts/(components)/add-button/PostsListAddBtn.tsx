import { PAGES } from '@/data/pages';

import s from '@/app/posts/(components)/add-button/PostsListAddBtn.module.css';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import CButton from '@/ui/atoms/CButton';

const ADD_BTN_LABEL = 'Create New';
const ARIA_LABEL_LINK = "'Open create new announcement page'";
const ARIA_LABEL_BTN = 'Create new announcement';
export default function PostsListAddBtn() {
    return (
        <Link
            href={PAGES.NEW_POST.link}
            className={s.btn}
            aria-label={ARIA_LABEL_LINK}
        >
            <CButton
                className={s.iconBtn}
                ariaLabel={ARIA_LABEL_BTN}
                equal
            >
                <Plus />
            </CButton>

            <CButton className={s.textBtn}>{ADD_BTN_LABEL}</CButton>
        </Link>
    );
}
