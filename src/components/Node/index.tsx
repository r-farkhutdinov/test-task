import { FC, memo, useCallback, useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { PagesContext } from '../../providers/PagesProvider';
import type { Page } from '../../types';
import { Tree } from '../Tree';
import styles from './styles.module.css';

const cx = classNames.bind(styles);
const basePadding = 22;
const padding = 16;

/**
 * Core node component (represents a clickable page)
 */
export const Node: FC<Page> = memo((props) => {
    const {
        id,
        title,
        pages,
        level
    } = props;

    const {
        activePage,
        changeActivePage,
    } = useContext(PagesContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const isExpandable = useMemo(() => (Boolean(pages?.length)), [pages?.length]);
    const isShowExpandedTree = useMemo(() => (isExpanded && isExpandable), [isExpandable, isExpanded]);
    const isActive = activePage === id;
    const isActiveLevelTwo = useMemo(() => (level > 0), [level]);
    const arrowTransform = useMemo(() => (`rotate(${isShowExpandedTree ? 90 : 0})`), [isShowExpandedTree]);

    const nodeStylePadding = useMemo(() => ({
        paddingLeft: basePadding + padding * level + (!isExpandable ? 20 : 0)
    }), [isExpandable, level]);

    const nodeClassNames = cx(
        styles.node, {
        [styles.expandable]: isExpandable,
        [styles.active]: isActive,
        [styles.rootActive]: isShowExpandedTree,
        [styles.rootActiveLevelTwo]: isShowExpandedTree && isActiveLevelTwo,
    });

    const onNodeClick = useCallback(() => {
        if (isExpandable) {
            setIsExpanded(isExpanded => !isExpanded);
            changeActivePage?.(id);
        }
    }, [changeActivePage, id, isExpandable]);

    return (
        <>
            <div className={nodeClassNames} style={nodeStylePadding} onClick={onNodeClick}>
                {isExpandable && <ArrowIcon className={cx(styles.arrow)} transform={arrowTransform} />}
                {title}
            </div>
            {isShowExpandedTree && <Tree isActive isActiveLevelTwo={isActiveLevelTwo} pages={pages} />}
        </>
    );
});