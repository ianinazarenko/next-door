import { PAGES } from '@/data/pages';

import s from '@/app/posts/(components)/add-button/PostsListAddBtn.module.css';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import CButton from '@/ui/atoms/CButton';

const ADD_BTN_LABEL = 'Create New';
export default function PostsListAddBtn() {
    return (
        <Link
            href={PAGES.NEW_POST.link}
            className={s.btn}
        >
            <CButton
                className={s.iconBtn}
                equal
            >
                <Plus />
            </CButton>

            <CButton className={s.textBtn}>{ADD_BTN_LABEL}</CButton>
        </Link>
    );
}
