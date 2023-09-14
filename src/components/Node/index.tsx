import { FC, memo, useCallback, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { PagesContext } from '../../providers/PagesProvider';
import type { Page } from '../../types';
import { Tree } from '../Tree';
import { basePadding, padding, nodeRootTestId } from './constants';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

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

    const isExpandable = (Boolean(pages?.length));
    const isShowExpandedTree = isExpanded && isExpandable;
    const isActive = activePage === id;
    const isActiveLevelTwo = level > 0;
    const arrowTransform = `rotate(${isShowExpandedTree ? 90 : 0})`;

    const nodeStylePadding = {
        paddingLeft: basePadding + padding * level + (!isExpandable ? 20 : 0)
    };

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
            <div data-testid={nodeRootTestId} className={nodeClassNames} style={nodeStylePadding} onClick={onNodeClick}>
                {isExpandable && <ArrowIcon className={cx(styles.arrow)} transform={arrowTransform} />}
                {title}
            </div>
            {isShowExpandedTree && <Tree isActive isActiveLevelTwo={isActiveLevelTwo} pages={pages} />}
        </>
    );
});