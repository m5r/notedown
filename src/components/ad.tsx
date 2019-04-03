import React, { FunctionComponent, useEffect, useState } from 'react';
import { AdPosition, AdSize } from 'capacitor-admob';
import { Plugins } from '@capacitor/core';

const Ad: FunctionComponent = () => {
	useEffect(() => {
		async function init() {
			const { AdMob } = Plugins;
			if (!AdMob) {
				return;
			}

			const { value } = await AdMob.initialize({ appId: 'ca-app-pub-7432334036707309~1116497479' });

			if (!value) {
				return;
			}

			AdMob.showBanner({
				adId: 'ca-app-pub-7432334036707309/6408723737',
				adSize: AdSize.BANNER,
				position: AdPosition.BOTTOM_CENTER,
			});
		}

		init();
	}, []);

	return null;
};

export default Ad;
