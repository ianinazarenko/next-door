import { PAGES } from '@/utils/data/pages';

import s from '@/app/components/pages/posts/list/PostsListAddBtn.module.css';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import CButton from '@/app/components/ui/CButton';

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
