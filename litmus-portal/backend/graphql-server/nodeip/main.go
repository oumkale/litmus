package main

import (
	"flag"
	"fmt"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func CreateHelperPod(experimentsDetails *experimentTypes.ExperimentDetails, clients clients.ClientSets, appName, appNodeName string) error {

	mountPropagationMode := apiv1.MountPropagationHostToContainer
	privileged := true

	helperPod := &apiv1.Pod{
		ObjectMeta: v1.ObjectMeta{
			Name:      "disk-fill-" + experimentsDetails.RunID,
			Namespace: experimentsDetails.ChaosNamespace,
			Labels: map[string]string{
				"app":      "disk-fill",
				"name":     "disk-fill-" + experimentsDetails.RunID,
				"chaosUID": string(experimentsDetails.ChaosUID),
			},
		},
		Spec: apiv1.PodSpec{
			RestartPolicy: apiv1.RestartPolicyNever,
			NodeName:      appNodeName,
			Volumes: []apiv1.Volume{
				{
					Name: "udev",
					VolumeSource: apiv1.VolumeSource{
						HostPath: &apiv1.HostPathVolumeSource{
							Path: experimentsDetails.ContainerPath,
						},
					},
				},
			},
			Containers: []apiv1.Container{
				{
					Name:            "disk-fill",
					Image:           experimentsDetails.LIBImage,
					ImagePullPolicy: apiv1.PullAlways,
					Args: []string{
						"sleep",
						"10000",
					},
					VolumeMounts: []apiv1.VolumeMount{
						{
							Name:             "udev",
							MountPath:        "/diskfill",
							MountPropagation: &mountPropagationMode,
						},
					},
					SecurityContext: &apiv1.SecurityContext{
						Privileged: &privileged,
					},
				},
			},
		},
	}

	_, err := clients.KubeClient.CoreV1().Pods(experimentsDetails.ChaosNamespace).Create(helperPod)
	return err
}

// GetIP function is to provide Node IP addresses
func GetIP() {
	fmt.Println("GetIP called")
	// Require variables declared
	var kubeconfig *string
	//nodeAddresses := []corev1.NodeAddress{}
	var fl int64 = 0

	// To get In-CLuster config
	config, err := rest.InClusterConfig()
	fmt.Println("Incluster called")
	// If In-Cluster is nil then it will go for Out-Cluster config
	if config == nil {
		fl = 1
		fmt.Println("config==nil")
		//To get Out-Cluster config
		if home := homedir.HomeDir(); home != "" {
			kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "kubeconfig file it is out-of-cluster")
		} else {
			kubeconfig = flag.String("kubeconfig", "", "Path to the kubeconfig file")
		}
		fmt.Println("kubeconfig :", kubeconfig)
		//panic(err.Error())
		flag.Parse()

		// uses the current context in kubeconfig
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			fmt.Println("congig err")
			panic(err.Error())
		}
	}
    
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	pod := CreateHelperPod()

	//fmt.Println("clientset :", clientset)
	// Using clientset get nodes
	node, err := clientset.CoreV1().Nodes().Get("minikube", metav1.GetOptions{})
	// use get funct
	//Get(name string, options metav1.GetOptions) (*v1.Node, error)

	pods, err := clientset.CoreV1().Pods("default").Get(metav1.GetOptions{})
		if err != nil {
			panic(err.Error())
		}
		for _, pod := range pods.Items {
			pod, _ := clientset.CoreV1().Pods("default").Get(pod.Name, metav1.GetOptions{})
			if pod.Name == os.Getenv("HOSTNAME") {
				IP = pod.Status.PodIP
			}
		} 
		
	if err != nil {
		panic(err)
	}
	fmt.Println(nodes, fl)
	//fmt.Println("nodes :", nodes)
	// Traverse to node to get IP addresses
	// If In-Cluster kubeconfig then return Internal IP
	// If Out-Cluster kubeconfig then return External IP
	fmt.Println("len(nodes) :", len(nodes.Type))
	//fmt.Println("len(nodes) :", nodes.Items[0].Status.Addresses)
	
		for i := 0; i < len(nodes.Items); i++ {
			nodeAddresses = nodes.Items[i].Status.Addresses
			fmt.Println("nodeAddresses :", nodeAddresses[i])
			fmt.Println("len(nodeAddresses) :", len(nodeAddresses))

			for j := 0; j < len(nodeAddresses); j++ {
				nodeAddress := nodeAddresses[j]
				if fl == 0 {
					if nodeAddress.Type == corev1.NodeInternalIP {
						fmt.Println(nodeAddress.Address)
						// Internal IP if Inside Of Cluster
					}
				} else if fl == 1 {
					if nodeAddress.Type == corev1.NodeExternalIP {
						fmt.Println(nodeAddress.Address)
						// External IP if Out Of Cluster
					}
				}
			}
		}
	
}

func main() {
	fmt.Println("Start")
	GetIP()

}
